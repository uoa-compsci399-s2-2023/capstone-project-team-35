import subprocess
import os
import shutil

app_entry_file = "ocellai_backend.py"
app_entry_point_path = os.path.join("..", app_entry_file)
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
    app_entry_point_path,
]

try:
    subprocess.run(command, check=True)
    print("PyInstaller completed successfully.")
    
    # Remove the 'build' directory and 'wsgi.spec' file
    build_dir = os.path.join(os.getcwd(), 'build')
    spec_file = f"{app_entry_file}.spec"
    
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)  # Remove the 'build' directory and its contents
    
    if os.path.exists(spec_file):
        os.remove(spec_file)  # Remove the '.spec' file
        
except subprocess.CalledProcessError:
    print("PyInstaller encountered an error.")

print("Finished building the backend application!")