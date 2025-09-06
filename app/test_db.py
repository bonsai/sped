import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Get database URL from environment variables
DATABASE_URL = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_SERVER')}/{os.getenv('POSTGRES_DB')}"

try:
    # Try to connect to the database
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("✅ Successfully connected to the database!")
    connection.close()
except Exception as e:
    print("❌ Failed to connect to the database:")
    print(f"Error: {e}")
    print("\nPlease check the following:")
    print(f"1. Is PostgreSQL running on {os.getenv('POSTGRES_SERVER')}?")
    print(f"2. Does the database '{os.getenv('POSTGRES_DB')}' exist?")
    print(f"3. Are the credentials in .env file correct?")
    print(f"   - User: {os.getenv('POSTGRES_USER')}")
    print(f"   - Database: {os.getenv('POSTGRES_DB')}")
    print("\nYou can create the database with:")
    print(f"   createdb -U {os.getenv('POSTGRES_USER')} {os.getenv('POSTGRES_DB')}")
