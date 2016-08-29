# Create a user called bardhop-admin who is superuser
sudo -u postgres createuser --interactive

# Create our dev database
sudo -u postgres createdb bardhop-dev

# Create our UNIX account to login (needs to be same as the database username)
sudo adduser bardhop-admin

# Use the following to login
#sudo -i -u bardhop-admin; psql

