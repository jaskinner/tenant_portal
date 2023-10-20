-- init.sql
CREATE USER 'app_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON tenant_portal.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
