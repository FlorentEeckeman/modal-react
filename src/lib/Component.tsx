import { useModal } from "./Modal";

export const Component = () => {
  const { modals, openModal } = useModal();
  const { isActive, getCurrentModal } = useModal();

  const handleOpenModal = () => {
    console.log(isActive());
    openModal({
      id: "component-1",
      title: "mon joli title",
      desc: "oh la jolie desc",
      closeExisting: true,
      escapeClose: true,
      clickClose: true,
      closeText: "Close",
      closeClass: "test-close",
      showClose: true,
      modalClass: "modal",
      blockerClass: "modal",
    });
  };
  console.log(getCurrentModal());
  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
    </div>
  );
};
