FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends nodejs ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . /app
RUN python3 araclar/ai_indeks.py && useradd --create-home sekine \
    && chown -R sekine:sekine /app/ai/.data
USER sekine
EXPOSE 8787
CMD ["python3", "-m", "ai.server", "--host", "0.0.0.0", "--port", "8787"]
