import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatFileSize } from '~/lib/utils'

interface FileUploaderProps {
    onFileSelect? : (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {


    // Manage the file state internally using React's useState hook
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        // Update both the internal state and the parent state
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect])


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf' : ['.pdf']},
        maxSize: 20*1024*1024,
    })


    // Function to clear the selected file
    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect?.(null);
    }


    return (
        <div className='w-full gradient-border'>
            <div {...getRootProps()} className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                <input {...getInputProps()} />
               
                <div className='space-y-4 cursor-pointer'>
                    {selectedFile ? ( // Use the new state variable here
                        <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-3 w-full">
                                <img src="/images/pdf.png" alt="pdf" className='size-10'/>
                                <div>
                                    <p className="text-lg font-medium text-gray-800 truncate max-w-xs">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>


                            <button type='button' className='p-2 cursor-pointer' onClick={clearFile}>
                                <img src="/icons/cross.svg" alt="remove" className='w-4 h-4'/>
                            </button>
                        </div>
                    ):(
                        <div>
                            <div className='mx-auto w-16 h-16 flex items-center justify-center mb-3.5'>
                                <img src="/icons/info.svg" alt="upload" className='size-20' />
                            </div>
                            <p className='text-lg text-gray-500'>
                                <span className='font-semibold'>Click to Upload </span>
                                or drag and drop
                            </p>
                            <p className='text-lg text-gray-500'>PDF (max20mb)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default FileUploader

