<script setup>
import { ref } from "vue";
import "./../style.css";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo on the left -->
      <div class="navbar-logo">
        <router-link to="/" @click="closeMenu">ZHYN</router-link>
      </div>

      <!-- Hamburger menu button on the right -->
      <button
        class="hamburger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation menu -->
      <div class="nav-menu" :class="{ active: isMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu"
          >Home</router-link
        >
        <router-link to="/practice" class="nav-link" @click="closeMenu"
          >Practice</router-link
        >
        <router-link to="/playground" class="nav-link" @click="closeMenu"
          >Playground</router-link
        >
        <router-link to="/about" class="nav-link" @click="closeMenu"
          >About</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.navbar-logo a {
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.navbar-logo a:hover {
  transform: scale(1.05);
}

/* Hamburger menu button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger span {
  width: 30px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(10.5px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-10.5px) rotate(-45deg);
}

/* Navigation menu */
.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.nav-link:hover::after {
  width: 80%;
  background: var(--color-primary-light);
}

.nav-link.router-link-active {
  background: rgba(var(--color-primary-light), 0.1);
}

.nav-link.router-link-active::after {
  width: 80%;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: 0;
    top: 60px;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    gap: 0;
    padding: 1rem 0;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .nav-menu.active {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-radius: 0;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}
</style>
