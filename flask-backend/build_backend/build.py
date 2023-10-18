import subprocess
import os
import shutil

# Define the entry point Python script (ocellai.py) and the output directory
app_entry_point = os.path.join("..", "ocellai.py")
all_data_directory = os.path.join("..", "app", "data")
output_directory_name = "packaged_backend"  # This is where the output build executable will be placed

# Run PyInstaller
command = [
    "pyinstaller",
    "--onedir",
    "--add-data",
    all_data_directory + "/:" + os.path.join("app", "data"),
    "--distpath",
    output_directory_name,
    app_entry_point,
]

try:
    subprocess.run(command, check=True)
    print("PyInstaller completed successfully.")
    
    # Remove the 'build' directory and 'wsgi.spec' file
    build_dir = os.path.join(os.getcwd(), 'build')
    spec_file = "ocellai.spec"
    
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)  # Remove the 'build' directory and its contents
    
    if os.path.exists(spec_file):
        os.remove(spec_file)  # Remove the 'wsgi.spec' file
        
except subprocess.CalledProcessError:
    print("PyInstaller encountered an error.")

print("Finished building your Python application.")