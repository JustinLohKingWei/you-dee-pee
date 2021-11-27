from setuptools import setup
setup(
    name = 'udp_httpfs',
    version = '0.1.0',
    packages = ['udp_httpfs'],
    entry_points = {
        'console_scripts': [
            'udp_httpfs = udp_httpfs.__main__:main'
        ]
    })