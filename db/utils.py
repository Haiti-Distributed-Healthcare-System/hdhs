def edit_distance(str1, str2):
    return edit_distance_helper(str1, str2, len(str1) - 1, len(str2) - 1)


def edit_distance_helper(str1, str2, m, n):
    if m == 0:
        return n

    if n == 0:
        return m

    if str1[m] == str2[n]:
        return edit_distance_helper(str1, str2, m - 1, n - 1)

    return (
        min(
            edit_distance_helper(str1, str2, m, n - 1),
            edit_distance_helper(str1, str2, m - 1, n),
            edit_distance_helper(str1, str2, m - 1, n - 1),
        )
        + 1
    )
