import os
import sys

def check_python_version():
    print(f"🐍 Python Version: {sys.version.split()[0]}")

def check_imports():
    required = ['fastapi', 'sqlalchemy', 'psycopg2-binary', 'python-dotenv', 'pydantic']
    missing = []
    
    print("\n🔍 Checking required packages:")
    for package in required:
        try:
            __import__(package)
            print(f"   ✅ {package}")
        except ImportError:
            missing.append(package)
            print(f"   ❌ {package} (missing)")
    
    if missing:
        print("\n💡 Install missing packages with:")
        print(f"   pip install {' '.join(missing)}")

def check_env_vars():
    required_vars = ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_SERVER', 'POSTGRES_DB', 'SECRET_KEY']
    missing_vars = []
    
    print("\n🔍 Checking environment variables:")
    for var in required_vars:
        value = os.getenv(var)
        if value is None or value == '':
            missing_vars.append(var)
            print(f"   ❌ {var} (missing or empty)")
        else:
            print(f"   ✅ {var} (set)")
    
    if missing_vars:
        print("\n💡 Please set the missing environment variables in your .env file")
    else:
        print("\n✅ All required environment variables are set")

if __name__ == "__main__":
    print("\n🛠️  Environment Check")
    print("=" * 40)
    check_python_version()
    check_imports()
    check_env_vars()
    print("\n✨ Environment check complete!")
