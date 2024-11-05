// import React, { useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Button } from "@component-library/index";
// import DownloadIcon from "@mui/icons-material/Download";
// import { Heading } from "@component-library/index";
// import { Divider } from "@component-library/index";
// import { Container } from "@component-library/index";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { createDownload } from "@/services/utils";
// import useDownloadFile from "@/api/Process/Files/Mutations/useDownloadFile";
// import useDownloadZIP from "@/api/Process/Files/Mutations/useDownloadZIP";
// import useDeleteFile from "@/api/Process/Files/Mutations/useDeleteFile";
// import { FileProps, Process } from "@/api/Process/Querys/useGetProcess";
// import OwnerGate from "@/components/OwnerGate/OwnerGate";

// interface Props {
//   process: Process;
//   projectID: string;
// }

// const ProjectFile: React.FC<Props> = (props) => {
//   const { process } = props;
//   const { t } = useTranslation();
//   const [loadingFileID, setLoadingFileID] = useState<string>("");
//   const [downloadFilesZIPIsLoading, setDownloadFilesZIPIsLoading] =
//     useState<boolean>(false);

//   const downloadFile = useDownloadFile();
//   const downloadFiles = useDownloadZIP();
//   const deleteFile = useDeleteFile();

//   const handleOnClickButtonDelete = (file: FileProps) => {
//     deleteFile.mutate({ processID: process.processID, fileID: file.id });
//   };

//   const handleOnClickButtonDownloadFile = (file: FileProps) => {
//     setLoadingFileID(file.id);
//     downloadFile.mutate(
//       { processID: process.processID, fileID: file.id },
//       {
//         onSuccess(data) {
//           if (data) {
//             createDownload(data, file.fileName);
//             setLoadingFileID("");
//           }
//         },
//       }
//     );
//   };
//   const handleOnClickButtonDownloadZip = () => {
//     setDownloadFilesZIPIsLoading(true);
//     downloadFiles.mutate(process.files.map((file) => file.id));
//   };

//   return (
//     <div className="flex w-full flex-col items-center justify-center gap-5">
//       <div className="flex w-full items-center gap-3">
//         <Heading variant="h2">
//           {t("Projects.Project.Process.components.ProcessFile.title")}:
//         </Heading>
//         <Divider className="mt-[0.3rem]" />
//       </div>
//       <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
//         {process.files.length > 0 ? (
//           <>
//             {process.files.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center justify-center rounded-md  p-2 shadow-md"
//               >
//                 <span className="p-2">{file.fileName}</span>
//                 <Container>
//                   <OwnerGate>
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       onClick={() => handleOnClickButtonDelete(file)}
//                       children={<DeleteIcon />}
//                       loading={loadingFileID === file.id}
//                       title={t(
//                         "Projects.Project.Process.components.ProcessFile.button.delete"
//                       )}
//                     />
//                   </OwnerGate>
//                   <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => handleOnClickButtonDownloadFile(file)}
//                     children={<DownloadIcon />}
//                     loading={loadingFileID === file.id}
//                     title={t(
//                       "Projects.Project.Process.components.ProcessFile.button.download"
//                     )}
//                   />
//                 </Container>
//               </div>
//             ))}
//           </>
//         ) : (
//           t("Projects.Project.Process.components.ProcessFile.empty")
//         )}
//       </div>
//       {process.files.length > 0 ? (
//         <Button
//           title={t(
//             "Projects.Project.Process.components.ProcessFile.button.downloadAll"
//           )}
//           size="sm"
//           onClick={handleOnClickButtonDownloadZip}
//           startIcon={<DownloadIcon />}
//           loading={downloadFilesZIPIsLoading}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default ProjectFile;
