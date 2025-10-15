import React from 'react';
import './Settings.css';

export const SettingsView = ({ user, theme, setTheme }) => {
    return (
        <div className="settings-view-container">
             <h2>Configuración</h2>
             <div className="settings-section">
                <h3>Perfil</h3>
                <div className="form-row">
                    <div className="form-label">
                        <p>Nombre Completo</p>
                    </div>
                    <span>{user.name}</span>
                </div>
                <div className="form-row">
                    <div className="form-label">
                        <p>Iniciales</p>
                    </div>
                    <span>{user.initials}</span>
                </div>
             </div>
             <div className="settings-section">
                <h3>Apariencia</h3>
                 <div className="form-row">
                    <div className="form-label">
                        <p>Tema</p>
                        <span>Cambia entre modo claro y oscuro.</span>
                    </div>
                    <div className="theme-switch-wrapper">
                        <span>Claro</span>
                        <label className="theme-switch">
                            <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                            <span className="slider"></span>
                        </label>
                        <span>Oscuro</span>
                    </div>
                </div>
             </div>
        </div>
    );
};

