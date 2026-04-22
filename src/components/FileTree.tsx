import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown } from 'lucide-react';

type FileNode = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: Record<string, FileNode>;
};

export function buildFileTree(filePaths: string[]): Record<string, FileNode> {
  const root: Record<string, FileNode> = {};

  for (const path of filePaths) {
    const parts = path.split('/');
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join('/');

      if (!currentLevel[part]) {
        currentLevel[part] = {
          name: part,
          type: isFile ? 'file' : 'folder',
          path: currentPath,
          ...(isFile ? {} : { children: {} })
        };
      }

      if (!isFile) {
        currentLevel = currentLevel[part].children!;
      }
    }
  }

  return root;
}

interface FileTreeProps {
  tree: Record<string, FileNode>;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
  level?: number;
}

export function FileTree({ tree, selectedFile, onSelectFile, level = 0 }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const nodes = Object.values(tree).sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });

  return (
    <div className="w-full">
      {nodes.map(node => (
        <div key={node.path}>
          <div
            className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-gray-800/50 text-sm transition-colors min-w-0 ${
              selectedFile === node.path ? 'bg-blue-600/10 text-blue-400' : 'text-gray-300'
            }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(node.path);
              } else {
                onSelectFile(node.path);
              }
            }}
          >
            {node.type === 'folder' ? (
              <>
                {expandedFolders[node.path] ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
                {expandedFolders[node.path] ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <Folder className="w-4 h-4 text-blue-400" />}
              </>
            ) : (
              <>
                <span className="w-3.5 h-3.5" /> {/* Spacer for alignment */}
                <FileCode className="w-4 h-4 text-gray-400" />
              </>
            )}
            <span className="truncate flex-1 min-w-0">{node.name}</span>
          </div>
          {node.type === 'folder' && expandedFolders[node.path] && node.children && (
            <FileTree
              tree={node.children}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}
