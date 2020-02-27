import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import glob

files = glob.glob("styles/*.npy")

for f in files:
    try:
        print(f)
        img_array = np.load(f)
        # plt.imshow(img_array, cmap='gray')
        # plt.show()
        # im = Image.fromarray(img_array)
        im = Image.fromarray(img_array.astype(np.uint8))
        im.show()
    except Exception as e:
        print(e)

    print('---------')

#
# im = Image.fromarray(img_array)
# # this might fail if `img_array` contains a data type that is not supported by PIL,
# # in which case you could try casting it to a different dtype e.g.:
# # im = Image.fromarray(img_array.astype(np.uint8))
#
# im.show()
