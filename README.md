intern-test

prerequire : Docker desktop , git


https://github.com/Huuwi/intern-test.git

cd intern-test

docker-compose up -d ; docker-compose logs -f backend

wait around 30 seconds to ensure all the service is running

access link : http://localhost:8001/api-docs/
