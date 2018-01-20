#!python3
import sys

from pyW215.pyW215 import SmartPlug, ON, OFF

try:
  command = sys.argv[1]
  ip = sys.argv[2]
  password = sys.argv[3]
except:
  print('smart plug: action (on or off), IP, password required')
  exit(1)

sp = SmartPlug(ip, password)

# Get values if available otherwise return N/A
# print(sp.current_consumption)
# print(sp.temperature)
# print(sp.total_consumption)

# Turn switch on and off
if(command == 'on'): 
  sp.state = ON
else:
  sp.state = OFF

