#!/bin/bash

mv files/code files/code.cpp
gcc files/code.cpp -o executable
if [[ $? -ne 0 ]]; then
    exit 145 # Compilation error. Terminate.
fi
# ./executable < files/input
./executable