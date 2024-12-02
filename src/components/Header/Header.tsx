import React, { useState } from "react";
import { Handbag, X } from "phosphor-react";
import { useContext } from "react";
import logoImg from "../../assets/logo.svg";
import Image from "next/image";
import {
  HeaderContainer,
  CartButton,
  DrawerContainer,
  DrawerContent,
  DrawerHeader,
  Overlay,
  DrawerContentItem,
  DrawerContentItemImageContainer,
  DrawerContentItemInfoContainer,
  DrawerContentSummary,
  DrawerContentItemsContainer,
} from "./styles";
import { CartContext, useCart } from "../../contexts/cart";
import axios from "axios";

const Header = () => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { cartItems } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckout = async () => {
    const { cartItems } = useCart(); // Pega os itens do carrinho do contexto

    if (cartItems.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    try {
      const response = await axios.post("/api/checkout", {
        items: cartItems.map((item) => ({
          price: item.id, // ID do preço no Stripe
          quantity: item.quantity, // Quantidade
        })),
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl; // Redireciona para o Stripe
    } catch (err) {
      console.error(err);
      alert("Erro ao processar o checkout.");
    }
  };

  const { totalQtd, totalPrice } = cartItems.reduce(
    (total, item) => {
      const priceNumber = parseFloat(
        item.price.replace("R$", "").replace(",", ".")
      );
      total.totalQtd += item.quantity;
      total.totalPrice += priceNumber * item.quantity;
      return total;
    },
    { totalQtd: 0, totalPrice: 0 }
  );

  return (
    <>
      <HeaderContainer>
        <Image src={logoImg} alt="" />
        <CartButton background="gray" onClick={toggleDrawer}>
          <Handbag size={24} />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </CartButton>
      </HeaderContainer>
      <Overlay open={isOpen} onClick={toggleDrawer} />

      <DrawerContainer open={isOpen}>
        <DrawerHeader>
          <button onClick={toggleDrawer}>
            <X weight="bold" size={24} />
          </button>
        </DrawerHeader>

        <DrawerContent>
          <div>
            <h2>Sacola de compras</h2>
            <DrawerContentItemsContainer>
              {cartItems.map((item) => (
                <DrawerContentItem>
                  <DrawerContentItemImageContainer>
                    <Image width={100} height={100} src={item.imageUrl} />
                  </DrawerContentItemImageContainer>
                  <DrawerContentItemInfoContainer>
                    <div>
                      <p>{item.name}</p>
                      <p>
                        <strong>{item.price}</strong>
                      </p>
                    </div>
                    <button>Remover</button>
                  </DrawerContentItemInfoContainer>
                </DrawerContentItem>
              ))}
            </DrawerContentItemsContainer>
          </div>
          <DrawerContentSummary>
            <div>
              <div>
                <p>Quantidade</p>
                <span>{totalQtd}</span>
              </div>
              <div>
                <p>
                  <strong>Valor total</strong>
                </p>
                <span>
                  <strong>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(totalPrice)}
                  </strong>
                </span>
              </div>
            </div>
            <button onClick={handleCheckout}>Finalizar compra</button>
          </DrawerContentSummary>
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Header;
