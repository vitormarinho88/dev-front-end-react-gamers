import { navLinks } from './navLinks';
import Logo from '../../assets/gamers_2.svg';
import { SignOutIcon } from '@phosphor-icons/react';
import { useUser } from '../../hooks/useUser.js';
import { Container, NavLink, NavLinkContainer, Footer } from './styles.js';
import { useResolvedPath } from 'react-router-dom';

export function SideNavAdmin() {
  const { logout } = useUser();
  
  const {pathname} = useResolvedPath();

  return (
    <Container>
      <img src={Logo} alt="Pc Gamer" />
      <NavLinkContainer>
        {navLinks.map((link) => (
          <NavLink 
          key={link.id} 
          to={link.path}
          $isActive={pathname === link.path}
         >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onclick={logout}>
          <SignOutIcon />
          <p>Sair</p>
        </NavLink>
      </Footer>
    </Container>
  );
}
