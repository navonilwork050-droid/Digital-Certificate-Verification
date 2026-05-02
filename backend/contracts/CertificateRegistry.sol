// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    struct Certificate {
        string studentName;
        string degree;
        address issuer;
        uint256 issueDate;
        bytes32 certHash;
        bool exists;
    }

    mapping(bytes32 => Certificate) public certificates;
    bytes32[] public certificateList;

    event CertificateIssued(
        bytes32 indexed certHash,
        string studentName,
        string degree,
        address indexed issuer,
        uint256 timestamp
    );

    function issueCertificate(
        string memory studentName,
        string memory degree,
        bytes32 certHash
    ) public {
        require(!certificates[certHash].exists, "Certificate already exists");
        require(bytes(studentName).length > 0, "Student name required");
        require(bytes(degree).length > 0, "Degree required");

        Certificate storage cert = certificates[certHash];
        cert.studentName = studentName;
        cert.degree = degree;
        cert.issuer = msg.sender;
        cert.issueDate = block.timestamp;
        cert.certHash = certHash;
        cert.exists = true;

        certificateList.push(certHash);

        emit CertificateIssued(certHash, studentName, degree, msg.sender, block.timestamp);
    }

    function verifyCertificate(bytes32 certHash)
        public
        view
        returns (
            string memory studentName,
            string memory degree,
            address issuer,
            uint256 issueDate,
            bool exists
        )
    {
        Certificate memory cert = certificates[certHash];
        return (
            cert.studentName,
            cert.degree,
            cert.issuer,
            cert.issueDate,
            cert.exists
        );
    }

    function getCertificateCount() public view returns (uint256) {
        return certificateList.length;
    }

    function getCertificateByIndex(uint256 index)
        public
        view
        returns (bytes32)
    {
        require(index < certificateList.length, "Index out of bounds");
        return certificateList[index];
    }
}
