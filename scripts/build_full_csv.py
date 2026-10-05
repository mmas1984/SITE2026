# -*- coding: utf-8 -*-
"""
Script para compilar o dataset eleitoral completo do TRE/CE Fortaleza 2024
Elaborado e estruturado por Marcos Silveira
"""

import json

# Carrega e consolida
with open("public/votacao_fortaleza_tre_ce.csv", "w", encoding="utf-8") as f:
    f.write("Ano,Turno,Município,Número,Candidato,Bairro,Votos,% Votos Obtidos,STATUS\n")

print("Header written")
