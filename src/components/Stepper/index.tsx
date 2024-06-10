import styles from './stepper.module.scss';

interface Props {
  activeStep: string;
  maxStep: string;
  labelStep: string;
}

export default function Stepper({ activeStep, maxStep, labelStep }: Props) {
  return (
    // role="progressbar" é uma propriedade que indica que o componente é uma barra de progresso
    // aria-live="polite" e aria-atomic="true", são propriedades que indicam que o conteúdo da div é dinâmico e 
    // deve ser lido pelo leitor de tela
    <div
      role="stepper"
      aria-valuenow={parseInt(activeStep)}
      aria-valuemin={1}
      aria-valuemax={parseInt(maxStep)}
      aria-label={`Etapa ${activeStep} de ${maxStep}`}
      className={styles.progress}
    >
      <div>
        <span className={styles.steplabel} aria-live="polite" aria-atomic="true">
          Etapa <span>{activeStep}</span> de {maxStep}
        </span>
      </div>
      <h1 aria-live="polite">{labelStep}</h1>
    </div>
  );
}
