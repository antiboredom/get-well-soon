def accomodate_list_to_character_limit(lines):
    global formatted_lines
    formatted_lines = []

    def split_if_greater(line, character_limit=75):
        global formatted_lines
        if len(line) > character_limit:
            # print("Input Line greater than ", character_limit,
            #       " characters. Moving to a new line.")
            line_2 = line[character_limit - 2:]  # Later longs part
            line_1 = line[:character_limit - 2]  # First part
            formatted_lines.append(line_1)
            split_if_greater(line_2)
        else:
            formatted_lines.append(line)
            return None

    final_list = []
    for line_l in lines:
        formatted_lines = []
        split_if_greater(line_l)
        for l in formatted_lines:
            final_list.append(l)

    return final_list


def replace_characters_absent_from_characterset(lines):
    character_set = None
    # 'Q', 'X' and 'Z
    raise NotImplementedError
