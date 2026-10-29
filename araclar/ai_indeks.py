#!/usr/bin/env python3
"""Kullanım: python3 araclar/ai_indeks.py [--output DOSYA]"""
from pathlib import Path
import runpy
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
runpy.run_module('ai.index', run_name='__main__')
