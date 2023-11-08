virtualenv venv
source venv/bin/activate
pip install -r packages.txt
chmod +x manage.py
./manage.py makemigrations
./manage.py migrate
