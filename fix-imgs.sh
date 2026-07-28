#!/bin/bash
find app components features -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/<img /<Image /g'
