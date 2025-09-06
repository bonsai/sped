import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

def test_connection():
    print("🔍 Testing database connection...")
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Get database configuration
    db_config = {
        'user': os.getenv('POSTGRES_USER'),
        'password': os.getenv('POSTGRES_PASSWORD'),
        'host': os.getenv('POSTGRES_SERVER'),
        'database': os.getenv('POSTGRES_DB'),
        'port': '5432'
    }
    
    # Create database URL
    DATABASE_URL = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    
    print(f"\n📋 Database Configuration:")
    for key, value in db_config.items():
        print(f"   {key}: {value}")
    
    try:
        print("\n🔌 Attempting to connect to the database...")
        engine = create_engine(DATABASE_URL)
        with engine.connect() as connection:
            # Test the connection
            result = connection.execute(text("SELECT version();"))
            db_version = result.scalar()
            print(f"\n✅ Successfully connected to PostgreSQL!")
            print(f"   PostgreSQL Version: {db_version}")
            
            # Check if the database is empty
            result = connection.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public';"))
            tables = [row[0] for row in result]
            
            if tables:
                print("\n📊 Existing tables in the database:")
                for table in tables:
                    print(f"   - {table}")
            else:
                print("\nℹ️  The database is empty. You'll need to run migrations to create the necessary tables.")
                
    except Exception as e:
        print("\n❌ Failed to connect to the database:")
        print(f"   Error: {str(e)}")
        
        # Provide specific guidance based on common errors
        if "Connection refused" in str(e):
            print("\n💡 PostgreSQL might not be running. Try starting the PostgreSQL service.")
        elif "does not exist" in str(e):
            print(f"\n💡 The database '{db_config['database']}' doesn't exist. Create it with:")
            print(f"   createdb -U {db_config['user']} {db_config['database']}")
        elif "password authentication failed" in str(e):
            print("\n💡 Authentication failed. Please check your database username and password in the .env file.")
        
        print("\n🔧 Troubleshooting steps:")
        print("1. Make sure PostgreSQL is running")
        print("2. Verify the database name, username, and password in your .env file")
        print("3. Check if the database exists and is accessible with the provided credentials")
        print("4. Ensure PostgreSQL is configured to accept connections (check pg_hba.conf)")
        
        return False
    
    return True

if __name__ == "__main__":
    test_connection()
