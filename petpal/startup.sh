virtualenv venv
source venv/bin/activate
cd petpal
pip install -r packages.txt
chmod +x manage.py
./manage.py makemigrations
./manage.py migrate
