import time
import random

from hand import Hand
from utils.string_utils import accomodate_list_to_character_limit

style_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

if __name__ == "__main__":

    with open("../unique_well_wishes.txt", "r") as infile:
        alllines = infile.readlines()

    hand = Hand()

    for i, line in enumerate(alllines):
        print(i, line)

        try:
            line = line.strip()
            outname = "../well_wishes/{}.svg".format(str(i).zfill(8))

            lines = accomodate_list_to_character_limit([line])
            biases = [random.uniform(0.7, 0.9) for i in lines]
            styles = [random.choice(style_options) for i in lines]
            stroke_colors = ["black" for i in lines]
            stroke_widths = [random.uniform(0.7, 3.0) for i in lines]
            line_height = 40
            view_width = 1000

            hand.write(
                filename=outname,
                lines=lines,
                biases=biases,
                styles=styles,
                stroke_colors=stroke_colors,
                stroke_widths=stroke_widths,
                line_height=line_height,
                view_width=view_width,
                align_center=False,
            )
        except Exception as e:
            print(e)
