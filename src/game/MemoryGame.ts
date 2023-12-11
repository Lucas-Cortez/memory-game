import { v4 as uuid } from "uuid";

export type Card = {
  img: string;
  label: string;
  name: string;
};

export type MemoryGameCard = Card & { id: string; flipped: boolean };

export type MappedCards = Map<string, MemoryGameCard>;

export class MemoryGame {
  private readonly mappedCards: MappedCards = new Map();

  constructor(cards: Card[]) {
    const shuffledCards = this.shuffleCards(cards);

    shuffledCards.forEach((card) => {
      const cardId = uuid();
      this.mappedCards.set(cardId, { ...card, id: cardId, flipped: false });
    });
  }

  private shuffleCards(cards: Card[]) {
    const newCards: Card[] = [];

    cards.forEach((card) => {
      newCards.push(card, card);
    });

    newCards.sort(() => 0.5 - Math.random());

    return newCards;
  }

  public getUiCards() {
    return Array.from(this.mappedCards.values());
  }

  public checkPairing(firstCardId: MemoryGameCard["id"], secondCardId: MemoryGameCard["id"]) {
    const firstCard = this.getCard(firstCardId);
    const secondCard = this.getCard(secondCardId);

    if (!firstCard || !secondCard) return false;

    const check = firstCard.name === secondCard.name;

    if (!check) {
      this.flipCard(firstCard.id);
      this.flipCard(secondCard.id);
    }

    return check;
  }

  public flipCard(cardId: MemoryGameCard["id"]) {
    const card = this.getCard(cardId);

    if (card) {
      this.mappedCards.set(card.id, { ...card, flipped: !card.flipped });
    }
  }

  public flipAllCards() {
    this.mappedCards.forEach((value, key) => {
      this.mappedCards.set(key, { ...value, flipped: !value.flipped });
    });
  }

  public getCard(cardId: MemoryGameCard["id"]) {
    return this.mappedCards.get(cardId);
  }

  public exists(cardId: MemoryGameCard["id"]) {
    return this.mappedCards.has(cardId);
  }

  public static create(cards: Card[]) {
    return new MemoryGame(cards);
  }
}
