import os
from glob import glob
import drawBot as db
from tqdm import tqdm

files = glob("../docs/sorts/*.html")

WIDTH = 1920
HEIGHT = 1080


def get_lines(filename):
    with open(filename, "r") as infile:
        content = infile.read()
    lines = content.replace("<p>", "").split("</p>")
    lines = [l.strip() for l in lines if l.strip() != ""]
    return lines


def fixed_start(lines, outname, padding=50):
    longest = sorted(lines, key=lambda l: len(l))[-1]

    db.newDrawing()

    x = padding
    y = padding
    w = WIDTH - padding * 2
    h = HEIGHT - padding * 2

    fontsize = 300
    db.font("Times", fontsize)
    _w, _h = db.textSize(longest, width=w)

    while _w > w or _h > h:
        fontsize -= 0.1
        db.font("Times", fontsize)
        _w, _h = db.textSize(longest, width=w)

    print(fontsize)

    for line in lines:
        db.newPage(WIDTH, HEIGHT)
        db.frameDuration(0.25)
        db.fill(1)
        db.rect(0, 0, WIDTH, HEIGHT)

        db.fill(0)
        db.font("Times", fontsize)
        lh = db.fontLineHeight()
        db.textBox(line, (x, y + lh - fontsize, w, h))

    db.saveImage(outname)
    db.endDrawing()


def full_text(lines, outname, padding=50):
    db.newDrawing()
    for line in lines:
        db.newPage(WIDTH, HEIGHT)
        db.frameDuration(1)
        db.fill(1)
        db.rect(0, 0, WIDTH, HEIGHT)

        db.fill(0)

        x = padding
        y = padding
        w = WIDTH - padding * 2
        h = HEIGHT - padding * 2

        fontsize = 300
        db.font("Times", fontsize)
        _w, _h = db.textSize(line, width=w)

        if _w < w and _h < h:
            fontsize = 600
            db.font("Times", fontsize)
            _w, _h = db.textSize(line, width=w)

        while _w > w or _h > h:
            fontsize -= 0.1
            db.font("Times", fontsize)
            _w, _h = db.textSize(line, width=w)

        lh = db.fontLineHeight()
        db.textBox(line, (x, y + lh - fontsize, w, h))
        print(_w, _h, fontsize, line)
    db.saveImage(outname)
    db.endDrawing()


def scrolled(lines, outname, padding=50, scrollspeed=1, fontsize=30):
    db.newDrawing()
    lines = "\n".join(lines)

    x = padding
    w = WIDTH - padding * 2

    db.font("Times", fontsize)
    _w, _h = db.textSize(lines, width=w)
    db.endDrawing()


    total_frames = int(_h / scrollspeed)
    fps = 30
    duration = 1 / fps
    y = -_h

    print(total_frames)

    # total_frames = 100

    for i in tqdm(range(total_frames)):
        db.newDrawing()
        db.newPage(WIDTH, HEIGHT)
        db.frameDuration(duration)
        db.fill(1)
        db.rect(0, 0, WIDTH, HEIGHT)

        db.fill(0)
        db.font("Times", fontsize)

        db.textBox(lines, (x, y, _w, _h))
        y += scrollspeed

        db.saveImage(f"frames/{outname}_{str(i).zfill(6)}.jpg")
        db.endDrawing()

lines = get_lines(files[0])
# full_text(lines)
outname = os.path.basename(files[0])
scrolled(lines, outname)
