# -*- coding: utf-8 -*-
import os

with open("scripts/part1.csv", "r", encoding="utf-8") as f:
    part1 = f.read()

with open("public/votacao_fortaleza_tre_ce.csv", "a", encoding="utf-8") as f:
    f.write(part1)

print("Part 1 appended")
