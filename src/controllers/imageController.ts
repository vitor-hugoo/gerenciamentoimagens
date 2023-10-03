import { error } from "console";
import { Request, Response } from "express";
import fs from "fs";

export const createImage = (req: Request, res: Response) => {
  try {
    console.log(req.file, "\nDeu bom\n");

    res.status(200).send("deu bom :D");
  } catch {
    res.status(500).send("deu ruim D:");
  }

  // Lógica para criar a imagem e salvar o caminho no banco de dados
};

//   const readImages = (req: Request, res: Response) => {
//     // Lógica para ler todas as imagens no banco de dados
//   };

//   const updateImage = (req: Request, res: Response) => {
//     // Lógica para atualizar uma imagem no banco de dados
//   };

export const deleteImage = (req: Request, res: Response) => {
  const { id } = req.params;

  const imagePath = `uploads/${id}.png` || `uploads/${id}.pdf`;

  try {
    fs.unlinkSync(imagePath);
    res.status(200).send("Excluída com sucesso!");
  } catch {
    console.error(error);
    res.status(500).send("Erro ao excluír");
  }
  // Lógica para excluir uma imagem do banco de dados
};

export const listImages = (req: Request, res: Response) => {
  const folder = "uploads";

  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error("Erro ao listar os arquivos: ", err);
      res.status(500).json({ error: "Erro ao listar os arqvuios" });
      return;
    }

    res.json({ files });
  });
};
//   export { createImage, readImages, updateImage, deleteImage };
