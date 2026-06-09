#!/usr/bin/env python3
"""Render CLARITY_Supplement_DRAFT.md -> public/clarity-supplement.pdf (reportlab Platypus)."""
import re, html, os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, HRFlowable, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

SRC = "CLARITY_Supplement_DRAFT.md"
OUT = "public/clarity-supplement.pdf"
NAVY = HexColor("#1F3864")
INK = HexColor("#23303a")
MID = HexColor("#4a5a66")

styles = getSampleStyleSheet()
def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

body = S("body", fontName="Times-Roman", fontSize=10.5, leading=15.5,
         textColor=INK, alignment=TA_JUSTIFY, spaceAfter=8)
h1 = S("h1", fontName="Helvetica-Bold", fontSize=19, leading=23, textColor=NAVY, spaceAfter=4)
sub = S("sub", fontName="Helvetica", fontSize=11, leading=15, textColor=MID, spaceAfter=2)
byline = S("byline", fontName="Helvetica", fontSize=9, leading=13, textColor=MID, spaceAfter=10)
h2 = S("h2", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=NAVY,
       spaceBefore=14, spaceAfter=6)
h3 = S("h3", fontName="Helvetica-Bold", fontSize=10.8, leading=14.5, textColor=INK, spaceAfter=3)
quote = S("quote", parent=body, fontSize=9.5, leading=14, textColor=MID,
          leftIndent=14, borderPadding=0, spaceBefore=4, spaceAfter=10)
bullet = S("bullet", parent=body, spaceAfter=4)
foot = S("foot", parent=body, fontName="Times-Italic", fontSize=9, leading=13, textColor=MID)

def inline(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", t)
    t = re.sub(r"`(.+?)`", r'<font face="Courier" size="9">\1</font>', t)
    return t

def header(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MID)
    canvas.drawString(doc.leftMargin, 0.55 * inch,
                      "Token Continuity Framework — CLARITY Act Supplement  ·  KVL Advisory")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.55 * inch, "Page %d" % doc.page)
    canvas.setStrokeColor(HexColor("#d9dee2"))
    canvas.line(doc.leftMargin, 0.7 * inch, letter[0] - doc.rightMargin, 0.7 * inch)
    canvas.restoreState()

flow = []
lines = open(SRC, encoding="utf-8").read().split("\n")
i, n = 0, len(lines)
pending_bullets = []

def flush_bullets():
    global pending_bullets
    if pending_bullets:
        flow.append(ListFlowable(
            [ListItem(Paragraph(inline(b), bullet), leftIndent=12, value="•")
             for b in pending_bullets],
            bulletType="bullet", start="•", leftIndent=14))
        flow.append(Spacer(1, 4))
        pending_bullets = []

while i < n:
    ln = lines[i].rstrip()
    if ln.startswith("- "):
        pending_bullets.append(ln[2:]); i += 1; continue
    flush_bullets()
    if not ln.strip():
        i += 1; continue
    if ln.startswith("# "):
        flow.append(Paragraph(inline(ln[2:]), h1))
    elif ln.startswith("## "):
        flow.append(Paragraph(inline(ln[3:]), h2))
    elif ln.startswith("> "):
        flow.append(Paragraph(inline(ln[2:]), quote))
    elif ln.startswith("---"):
        flow.append(Spacer(1, 2))
        flow.append(HRFlowable(width="100%", thickness=0.6, color=HexColor("#d9dee2")))
        flow.append(Spacer(1, 6))
    elif re.match(r"^\*\*[\d.]+ ", ln) or (ln.startswith("**") and ln.endswith("**") and ln.count("**") == 2):
        flow.append(Paragraph(inline(ln), h3))
    elif re.match(r"^\d+\.\s", ln):
        flow.append(Paragraph(inline(re.sub(r'^(\d+)\.\s', r'\1.&nbsp;&nbsp;', ln)), bullet))
    elif ln.startswith("*") and ln.endswith("*") and ln.count("*") == 2:
        flow.append(Paragraph(inline(ln), foot))
    else:
        # subtitle / byline near top
        if i < 6 and ln.startswith("**A supplement"):
            flow.append(Paragraph(inline(ln), sub))
        elif i < 7 and "KVL Advisory" in ln:
            flow.append(Paragraph(inline(ln), byline))
        else:
            flow.append(Paragraph(inline(ln), body))
    i += 1
flush_bullets()

os.makedirs("public", exist_ok=True)
doc = BaseDocTemplate(OUT, pagesize=letter,
                      leftMargin=1.05 * inch, rightMargin=1.05 * inch,
                      topMargin=0.95 * inch, bottomMargin=0.9 * inch,
                      title="Token Continuity Framework — CLARITY Act Supplement",
                      author="David T. Kuhn / KVL Advisory")
frame = Frame(doc.leftMargin, doc.bottomMargin,
              letter[0] - doc.leftMargin - doc.rightMargin,
              letter[1] - doc.topMargin - doc.bottomMargin, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=header)])
doc.build(flow)
print("wrote", OUT, os.path.getsize(OUT), "bytes")
