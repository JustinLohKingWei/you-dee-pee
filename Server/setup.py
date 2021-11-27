from setuptools import setup
setup(
    name = 'httpfs',
    version = '0.1.0',
    packages = ['httpfs'],
    entry_points = {
        'console_scripts': [
            'httpfs = httpfs.__main__:main'
        ]
    })