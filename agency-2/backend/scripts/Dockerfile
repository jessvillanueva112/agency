FROM python:3.8-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5001 5002
CMD ["sh", "-c", "python app.py & python note_type_app.py"] 