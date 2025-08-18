def iterate(d:dict, defkey="", defd=None):
    if defd is None:
        defd = d
    items = [(k,v) for k,v in d.items()]
    for key, val in items:
        defd[defkey+key] = val
        if isinstance(val, dict):
            iterate(val, f"{defkey}{key}/", defd)
    return d

if __name__ == "__main__":
    import json

    with open("input.json") as fp:
        mod = json.load(fp)
    
    print(iterate(mod))