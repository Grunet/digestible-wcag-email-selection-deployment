docker-compose up -d

# The GraphQL server isn't up immediately after the container is started, so this adds in a buffer accounting for that
sleep 3

res=$(curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ current { subject } }"}' \
http://localhost:4000/graphql)

docker-compose down

echo
echo "$res"