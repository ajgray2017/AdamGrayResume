def main(x):

    import math

    ops = {
        '+': lambda x, y: x + y,
        '-': lambda x, y: x - y,
        '*': lambda x, y: x * y,
        '/': lambda x, y: x / y,
        '%': lambda x, y: x % y,
    }

    results = []

    for opers in ops.items():
        print(f"Starting {opers[0]}")
        for i in range(x):
            for j in range(x):
                try:
                    ans = ops[opers[0]](i,j)
                except ZeroDivisionError:
                    ans = "Undefined"
                result = f"\tif x == '{i}' and sign == '{opers[0]}' and y == '{j}':\n\t\tprint('{i} {opers[0]} {j} = "+f"{ans}"+"')"+"\n"
                results.append(result)
    print("Starting File Writing")
    with open("Calclator.py", "w+") as file:
        file.write(f"def main(x, sign, y):\n")
        for line in results:
            file.write(line)
        file.write(f"""\n\nif __name__ == "__main__":
    limit = {x}    
    while True:
        x = input("Input first integer (<{x}): ").strip()
        sign = input("Input operator: ").strip()
        y = input("Input second integer (<{x}): ").strip()

        if int(x) > int(limit) or int(y) > int(limit):
            print("Input too large")
        else:
            main(x, sign, y)
        """)

if __name__ == "__main__":
    main(500)
