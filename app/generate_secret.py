import secrets

# Generate a secure secret key
secret_key = secrets.token_urlsafe(32)

# Update the .env file
with open('.env', 'r') as f:
    lines = f.readlines()

with open('.env', 'w') as f:
    for line in lines:
        if line.startswith('SECRET_KEY='):
            f.write(f'SECRET_KEY={secret_key}\n')
        else:
            f.write(line)

print(f'Updated SECRET_KEY in .env: {secret_key}')
