# Create a user called bardhop-dev who is superuser
sudo -u postgres createuser --interactive --pwprompt

# Create our dev database
sudo -u postgres createdb bardhop-dev

# Create our UNIX account to login (needs to be same as the database username)
sudo adduser bardhop-dev

# Use the following to login
#sudo -i -u bardhop-dev; psql

