#!/bin/bash
set -e

echo "▶ Entrando na pasta do projeto..."
cd "$(dirname "$0")"

# -------------------------------
# Instala Node.js/NPM se faltar
# -------------------------------
if ! command -v node >/dev/null 2>&1; then
  echo "▶ Node.js não encontrado. Instalando..."
  if [ -f /etc/debian_version ]; then
    sudo apt update && sudo apt install -y nodejs npm
  elif [ -f /etc/arch-release ]; then
    sudo pacman -S --noconfirm nodejs npm
  elif [ -f /etc/fedora-release ]; then
    sudo dnf install -y nodejs npm
  else
    echo "⚠️ Sistema não reconhecido. Instale Node.js manualmente."
    exit 1
  fi
else
  echo "▶ Node.js encontrado: $(node -v)"
fi

# -------------------------------
# Instala dependências do projeto
# -------------------------------
if [ ! -d "node_modules" ]; then
  echo "▶ Instalando dependências do projeto..."
  npm install
fi

# -------------------------------
# Instala Expo local se faltar
# -------------------------------
if [ ! -d "node_modules/expo" ]; then
  echo "▶ Instalando Expo local..."
  npm install expo
fi

# -------------------------------
# Instala @expo/ngrok local para túnel
# -------------------------------
if [ ! -d "node_modules/@expo/ngrok" ]; then
  echo "▶ Instalando @expo/ngrok local..."
  npm install @expo/ngrok
fi

# -------------------------------
# Limpa cache e roda Expo direto no celular
# -------------------------------
echo "▶ Iniciando Expo (QR code no celular)..."
npx expo start --tunnel --clear --no-global-ngrok || {
  echo "▶ Falha ao usar túnel. Tentando sem túnel..."
  npx expo start --lan --clear
}

echo "▶ Pronto! Abra o QR code no Expo Go do seu celular."
