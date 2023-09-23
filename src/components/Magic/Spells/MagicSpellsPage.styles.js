import styled from "@emotion/babel-plugin";

export const SpellCost = styled.div``;
export const Spell = styled.div``;

export const Spells = styled.div`
  display: flex;
  gap: calc(var(--padding-standard) / 2);
  margin-top: var(--padding-standard);

  ${Spell} {
    display: flex;
    flex-direction: column;
    gap: calc(var(--padding-standard) / 2);
  }
`;
