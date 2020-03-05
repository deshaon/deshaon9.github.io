#!bin/bash
if [ "$1"=="c" ]; then 
    mv code code.c
    gcc code.c -o executable &> complilation_result.txt 
elif [ "$1"=="c++" ]; then 
    mv code code.cpp
    g++ code.cpp -o executable &> complilation_result.txt 
elif [ "$1"=="java" ]; then 
    mv code code.java
    javac code.java &> complilation_result.txt
elif [ "$1"=="python"]; then
    mv code code.py
    python3 code.py
fi
if [[ $? -ne 0 ]]; then
    cat complilation_result.txt
    exit 145
fi
#  ./a.out > execution_result.txt
cat complilation_result.txt