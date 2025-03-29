#!/bin/bash

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "${YELLOW}======= 开始配置开发环境 =======${NC}"

# 更全面地检查 Rust 安装状态
check_rust_installed() {
    # 检查常见的 Rust 安装路径
    if [ -d "$HOME/.cargo" ] && [ -f "$HOME/.cargo/bin/rustc" ] && [ -f "$HOME/.cargo/bin/cargo" ]; then
        # 如果 Rust 已安装但命令不可用，可能是环境变量未设置
        if ! command -v rustc &> /dev/null || ! command -v cargo &> /dev/null; then
            echo "${BLUE}Rust 已安装但环境变量未设置，正在加载环境变量...${NC}"
            source "$HOME/.cargo/env" 2>/dev/null || export PATH="$HOME/.cargo/bin:$PATH"
        fi
    fi

    # 再次检查命令是否可用
    if command -v rustc &> /dev/null && command -v cargo &> /dev/null; then
        RUST_VERSION=$(rustc --version | cut -d ' ' -f 2)
        CARGO_VERSION=$(cargo --version | cut -d ' ' -f 2)
        echo "${GREEN}Rust 已安装: rustc ${RUST_VERSION}, cargo ${CARGO_VERSION}${NC}"
        return 0
    else
        echo "${YELLOW}未检测到 Rust 安装${NC}"
        return 1
    fi
}

# 检查 Rust 是否已安装
if check_rust_installed; then
    echo "${GREEN}使用已安装的 Rust${NC}"
else
    echo "${YELLOW}正在安装 Rust...${NC}"
    # 使用国内镜像安装 Rust
    export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
    export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
    curl --proto '=https' --tlsv1.2 -sSf https://mirrors.ustc.edu.cn/rust-static/rustup/rustup-init.sh | sh -s -- -y
    
    # 加载环境变量
    source "$HOME/.cargo/env" 2>/dev/null || export PATH="$HOME/.cargo/bin:$PATH"
    
    # 验证安装
    if check_rust_installed; then
        echo "${GREEN}Rust 安装成功!${NC}"
    else
        echo "${RED}Rust 安装可能失败，请手动检查${NC}"
        exit 1
    fi
fi

# 配置 Cargo 国内源
echo "${YELLOW}检查 Cargo 源配置...${NC}"
CONFIG_FILE="$HOME/.cargo/config.toml"
NEEDS_CONFIG=true

# 检查配置文件是否存在
if [ -f "$CONFIG_FILE" ]; then
    # 检查是否已配置国内源
    if grep -q "ustc\|tuna\|sjtu\|rustcc" "$CONFIG_FILE"; then
        echo "${GREEN}Cargo 国内源已配置，跳过配置${NC}"
        NEEDS_CONFIG=false
    else
        echo "${YELLOW}已存在 Cargo 配置文件，但未找到国内源配置${NC}"
        # 备份现有配置
        cp "$CONFIG_FILE" "$CONFIG_FILE.backup.$(date +%Y%m%d%H%M%S)"
        echo "${GREEN}已备份现有配置到 $CONFIG_FILE.backup.$(date +%Y%m%d%H%M%S)${NC}"
    fi
fi

if [ "$NEEDS_CONFIG" = true ]; then
    echo "${YELLOW}配置 Cargo 国内源...${NC}"
    mkdir -p "$HOME/.cargo"
    cat > "$CONFIG_FILE" << EOF
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

[build]
jobs = 4
EOF
    echo "${GREEN}Cargo 源配置完成!${NC}"
fi

echo "${GREEN}======= 开发环境配置完成 =======${NC}"
echo "${YELLOW}请关闭并重新打开终端，或运行以下命令使环境变量生效:${NC}"
echo "${YELLOW}source ~/.cargo/env${NC}"