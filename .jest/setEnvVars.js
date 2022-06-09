console.log('Configuration test environment');

process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_NAME = 'netguru';
process.env.DB_USER = 'netguru';
process.env.DB_PASSWORD = 'netguru!R4ndomS3cure';
process.env.JWT_SECRET = 'foo';
