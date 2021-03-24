import os

dir = sorted(os.listdir("C:\\Users\\orkun\\Desktop\\kartaca\\files"))
direct = "C:\\Users\\orkun\\Desktop\\kartaca\\files"

for filename in dir:
    with open(os.path.join(direct, filename), 'r') as f:
        string = f.read()
        lst = string.split()
        to_write = ''
        for i in lst:
            to_write += chr(int(i, 2))
        with open(os.path.join(direct, filename), 'w') as file:
            file.write(to_write)


for filename in dir:
    if(filename[-2] == '=' and filename[-1] == '='):
        with open(os.path.join(direct, filename), 'r') as f:
            string = f.read()
            print(string, end='')
for filename in dir:
    if(filename[-1] == '=' and filename[-2] != '='):
        with open(os.path.join(direct, filename), 'r') as f:
            string = f.read()
            print(string, end='')


lst1 = []
lst_i = []
for filename in dir:
    if(filename[-1] not in ['0', '1', '2', '3', '4', '5', "="]):
        with open(os.path.join(direct, filename), 'r') as f:
            string = f.read()
            lst_i.append(string)
    else:
        if(lst_i != []):
            lst1.append(lst_i)
        lst_i = []


lst2 = []
lst = []
for x in range(len(dir)):
    if (dir[x][-1] in ['0', '1', '2', '3', '4', '5']):
        with open(os.path.join(direct, dir[x]), 'r') as f:
            string = f.read()
            lst.append(string)
    else:
        if(lst != []):
            lst2.append(lst)
        lst = []

for i in range(len(lst2)):
    print("".join(lst1[i]), "".join(lst2[i]), end='')
print("".join(lst1[-1]))
