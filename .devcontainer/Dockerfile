# Use Microsoft's official Node.js DevContainer image
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Set the working directory
WORKDIR /workspaces/aicare

# Install necessary dependencies including Zsh
RUN apt-get update && apt-get install -y \
    git curl nano zsh \
    && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh for a better Zsh experience (optional)
RUN curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh || true

# Set Zsh as the default shell for the node user
RUN chsh -s /usr/bin/zsh node

# Switch to the `node` user and ensure Zsh is the default shell
USER node
ENV SHELL=/usr/bin/zsh
SHELL ["/usr/bin/zsh", "-c"]

# Ensure the container starts with Zsh
RUN echo "exec zsh" >> ~/.bashrc

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port 4000 instead of 3000
EXPOSE 4000

# Default command to run on port 4000
CMD ["npm", "run", "dev", "--", "-p", "4000"]
