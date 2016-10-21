# Linux Install
sudo apt-get install postgresql-client postgresql postgresql-contrib python-dev virtualenv fabric

# Heroku
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | s

# Redis
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
