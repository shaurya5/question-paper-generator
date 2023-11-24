import subprocess
import os
import signal
import platform
import time
import atexit

def cleanup():
    print("Cleaning up...")

    if platform.system() == "Windows":
        try:
            pid_3000 = subprocess.check_output(['netstat', '-ano', '|', 'findstr', ':3000'], text=True)
            pid_3000 = pid_3000.split()[4]

            pid_5000 = subprocess.check_output(['netstat', '-ano', '|', 'findstr', ':5000'], text=True)
            pid_5000 = pid_5000.split()[4]

            subprocess.run(['taskkill', '/F', '/PID', pid_3000], shell=True)
            subprocess.run(['taskkill', '/F', '/PID', pid_5000], shell=True)
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
    else:
        try:
            pid_3000 = subprocess.check_output(['lsof', '-t', '-i', ':3000'], text=True)
            pid_5000 = subprocess.check_output(['lsof', '-t', '-i', ':5000'], text=True)

            subprocess.run(['kill', '-15', pid_3000], shell=True)
            subprocess.run(['kill', '-15', pid_5000], shell=True)
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")

    print("Cleanup complete.")

atexit.register(cleanup)

os.chdir("client")
subprocess.Popen(['yarn', 'install'], shell=True)
subprocess.Popen(['npm', 'start'], shell=True)

time.sleep(5)

os.chdir("../server")
subprocess.Popen(['yarn', 'install'], shell=True)
subprocess.Popen(['node', 'index.js'], shell=True)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    pass
