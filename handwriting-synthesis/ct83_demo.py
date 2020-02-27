import time
import random

from hand import Hand
from utils.string_utils import accomodate_list_to_character_limit

style_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

if __name__ == "__main__":
    print("Entered main")
    start_time = time.time()  # start time of the loop

    hand = Hand()

    # usage demo
    lines = [
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
        "hi tega i love you!",
    ]
    lines = accomodate_list_to_character_limit(lines)
    biases = [random.uniform(0.7, 0.9) for i in lines]
    styles = [random.choice(style_options) for i in lines]
    stroke_colors = ["black" for i in lines]
    stroke_widths = [random.uniform(0.7, 3.0) for i in lines]
    line_height = 40
    view_width = 1000

    hand.write(
        filename="img/usage_demo_2.svg",
        lines=lines,
        biases=biases,
        styles=styles,
        stroke_colors=stroke_colors,
        stroke_widths=stroke_widths,
        line_height=line_height,
        view_width=view_width,
        align_center=False,
    )

    print("Time Taken: ", (time.time() - start_time) / 60, " Minutes")
